const TodoCard = () => {
  const html = `<div class="todo-description">Buy milk, eggs, bread, and fruits from the supermarket.</div>
  `;
  return (
    <section className="flex border border-gray-300 max-w-96 p-3 shadow-lg cursor-pointer rounded-md flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl">Title</h3>
        <p dangerouslySetInnerHTML={{ __html: html }}></p>

        <span className=" text-gray-400">Due: 2025-06-20</span>

        <span className="bg-amber-200 self-start px-2 py-0.5 rounded-md">pending</span>
      </div>

      <button className="bg-blue-500 py-3 font-medium text-xl rounded-md">View Details</button>
    </section>
  );
};
export default TodoCard;
