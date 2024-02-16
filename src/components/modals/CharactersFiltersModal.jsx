import { useEffect } from "react";
import ReactDom from "react-dom";

export const CharactersFiltersModal = ({
  isOpen,
  setIsOpen,
  setCharactersFiltersParams,
  charactersFiltersParams,
  getCharactersModalFetch,
}) => {
  if (!isOpen) return null;

  // const [personValue, setPersonValue] = useState("");
  // const [guildValue, setGuildValue] = useState("");
  // const [classValue, setClassValue] = useState("");

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
    getCharactersModalFetch();
    closeModal(isOpen);
  };

  return ReactDom.createPortal(
    <>
      <div className="modal-background" onClick={() => closeModal(isOpen)} />
      <div className="modal-main">
        <div className="modal-header">
          <div>Characters Filters</div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="modal-inputs-container">
            <div className="modal-input-field">
              <div>Person:</div>
              <div>
                <input
                  value={charactersFiltersParams.get("personName")}
                  onChange={(e) =>
                    setCharactersFiltersParams(
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
            <div className="modal-input-field">
              <div>Guild:</div>
              <div>
                <input
                  value={charactersFiltersParams.get("guild")}
                  onChange={(e) =>
                    setCharactersFiltersParams(
                      (prev) => {
                        prev.set("guild", e.target.value);
                        return prev;
                      },
                      { replace: true },
                    )
                  }
                />
              </div>
            </div>
            <div className="modal-input-field">
              <div>Class:</div>
              <div>
                <input
                  value={charactersFiltersParams.get("charClass")}
                  onChange={(e) =>
                    setCharactersFiltersParams(
                      (prev) => {
                        prev.set("charClass", e.target.value);
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

export default CharactersFiltersModal;
