import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

export const LootFiltersModal = ({
  isOpen,
  setIsOpen,
  lootFetchObject,
  setLootFiltersParams,
  lootFiltersParams,
}) => {
  if (!isOpen) return null;
  const [personValue, setPersonValue] = useState("");

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

    lootFetchObject?.fetchLoot();
    closeModal(isOpen);
  };

  return ReactDom.createPortal(
    <>
      <div className="modal-background" onClick={() => closeModal(isOpen)} />
      <div className="modal-main">
        <div className="modal-header">
          <div>Loot Filters</div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="modal-inputs-container">
            <div className="modal-input-field">
              <div>Person:</div>
              <div>
                <input
                  value={lootFiltersParams.get("personName")}
                  onChange={(e) =>
                    setLootFiltersParams(
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

export default LootFiltersModal;
