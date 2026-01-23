import { ReactComponent } from "@/types/ReactComponent";

interface PageTitleProps {
  title: string;
}

export const PageTitle: ReactComponent<PageTitleProps> = ({ title, children }) => {
  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-3xl font-medium">{title}</h1>
      <div>{children}</div>
    </div>
  );
};
