
import { RiMastodonLine } from "react-icons/ri";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";

const Onetodopage = ({ data, fetchtodos, next, back }) => {
  const statushandler = async (id, status) => {
    const res = await fetch("/api/auth/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.status === "success") fetchtodos();
  };

  return (
    <div className="tasks">
      {data?.map((item) => (
        <div className="tasks__card" key={item._id}>
          <span className={item.status}></span>
          <RiMastodonLine />
          <h4>{item.title}</h4>
          <div>
            {back ? (
              <button
                onClick={() => statushandler(item._id, back)}
                className="button-back"
              >
                <AiOutlineLeft />
                back
              </button>
            ) : null}
            {next ? (
              <button
                onClick={() => statushandler(item._id, next)}
                className="button-next"
              >
                next
                <AiOutlineRight />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Onetodopage;
