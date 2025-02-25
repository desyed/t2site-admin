import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export async function loader() {
  return {
    title: 'Dashboard',
  };
}

// Simulate a database
let todos = [{ id: 1, title: 'Do Laundry' }];

const getTodos = async () => {
  return todos;
};

const postTodo = async (todo: { id: number; title: string }) => {
  todos = [...todos, todo]; // Add the new todo to our list
  return todo;
};

export function Component() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    staleTime: 45 * 1000,
    refetchOnMount: true,
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <div className="mt-5 flex flex-1 flex-col gap-4 p-5 pt-0">
      <div>
        <ul>{data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>

        <button
          onClick={() => {
            mutation.mutate({
              id: Date.now(),
              title: 'Do Laundry',
            });
          }}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
