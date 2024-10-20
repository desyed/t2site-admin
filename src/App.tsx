import DashBoardSidebar from '@/layouts/dashboard/DashBoardSidebard';
import DashBoardContent from '@/layouts/dashboard/DashBoardContent';
import { ThemeProvider } from '@/components/theme-provider';

export default function App() {
  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="t2site-theme"
    >
      <DashBoardSidebar>
        <DashBoardContent>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted" />
              <div className="aspect-video rounded-xl bg-muted" />
              <div className="aspect-video rounded-xl bg-muted" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted md:min-h-min" />
          </div>
        </DashBoardContent>
      </DashBoardSidebar>
    </ThemeProvider>
  );
}
