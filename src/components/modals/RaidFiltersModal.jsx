import { useEffect } from "react";
import ReactDom from "react-dom";

export const RaidFiltersModal = ({
  isOpen,
  setIsOpen,
  raidsFiltersParams,
  setRaidsFilterParams,
  getRaidsModalFetch,
}) => {
  if (!isOpen) return null;
  //const [personValue, setPersonValue] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const modalElement = document.querySelector(".modal-main");
      if (modalElement) modalElement.classList.add("show");
    }, 10);
  }, []);

  const closeModal = (state) => {
    const modalElement = document.querySelector(".modal-main.show");
    if (modalElement) modalElement.classList.remove("show");
    setIsOpen(!state);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    getRaidsModalFetch();
    closeModal(isOpen);
  };

  return ReactDom.createPortal(
    <>
      <div className="modal-background" onClick={() => closeModal(isOpen)} />
      <div className="modal-main">
        <div className="modal-header">
          <div>Raid Filters</div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="modal-inputs-container">
            <div className="modal-input-field">
              <div>Person:</div>
              <div>
                <input
                  value={raidsFiltersParams.get("personName")}
                  onChange={(e) =>
                    setRaidsFilterParams(
                      (prev) => {
                        prev.set("personName", e.target.value);
                        return prev;
                      },
                      { replace: true },
                    )
                  }
                />
              </div>
            </div>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById("modal"),
  );
};

export default RaidFiltersModal;
