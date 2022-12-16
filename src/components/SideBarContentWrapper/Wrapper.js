function Wrapper({ children, title, className }) {
  return (
    <div className={className}>
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">{title}</h3>
      {children}
    </div>
  );
}
export default Wrapper;
