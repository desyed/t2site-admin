// mutationQueue.ts
type Task = () => Promise<unknown>;

const queue: Task[] = [];
let running = false;

async function processQueue() {
  if (running || queue.length === 0) return;
  running = true;
  try {
    const job = queue.shift()!;
    await job();
  } finally {
    running = false;
    processQueue();
  }
}

/**
 * Enqueue an async function so only one runs at a time.
 */
export function queueMutation<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const task: Task = async () => {
      try {
        resolve(await fn());
      } catch (e) {
        reject(e);
      }
    };
    queue.push(task);
    processQueue();
  });
}
