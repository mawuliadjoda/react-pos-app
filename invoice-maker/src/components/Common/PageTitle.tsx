
type PageTitleProps = {
  title: string
}
function PageTitle({title}: PageTitleProps) {
  return (
    <div>
    <h2 className="font-title text-2xl ">{title}</h2>
  </div>
  );
}

export default PageTitle;
