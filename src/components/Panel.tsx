import classNames from 'classnames';
type Props ={
  children: React.ReactNode,
  className:string
}
function Panel({ children, className, ...rest }:Props) {
  const finalClassNames = classNames(
    'border rounded p-3 shadow bg-white w-full',
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;
