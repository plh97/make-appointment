interface LayoutProps {
  readonly children?: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  return <div className="h-full flex">{props.children}</div>;
}
