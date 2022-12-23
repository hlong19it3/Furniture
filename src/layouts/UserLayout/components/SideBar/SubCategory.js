function SubCategory({ title, showSubCategory, setShowSubCategory, contents, onClick, checked }) {
  return (
    showSubCategory && (
      <div
        className="w-30 h-30 z-40 fixed top-1/3 left-1/4 bg-slate-300 border-solid border border-zinc-600 rounded-lg"
        onMouseLeave={() => setShowSubCategory(-1)}
      >
        <div className="font-bold text-2xl">{title}</div>
        <div className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
          {contents.map((content) => (
            <div
              key={content.id}
              aria-current="true"
              type="button"
              className="
                text-left
                px-6
                py-2
                border-b border-gray-200
                w-full
                rounded-t-lg
                bg-slate-500
                text-white
                cursor-pointer
              "
              onClick={() => onClick(content.id)}
            >
              <input
                checked={checked === content.id ? true : false}
                readOnly
                type="radio"
                name="cat-1"
                id={`cat-${content.id}`}
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label className="cursor-pointer" htmlFor={`cat-${content.id}`}>
                {content.type}
              </label>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
export default SubCategory;
