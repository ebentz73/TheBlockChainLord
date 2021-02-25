import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import BuySellForm from "./BuySellForm";
import "./BuySellForm.css";

export default function BuySellModal({ asset }) {
  const [showBuySellModal, setShowBuySellModal] = useState(false);

  if (showBuySellModal) {
    return (
      <>
        <Modal onClose={() => setShowBuySellModal(false)}>
          <BuySellForm
            asset={asset}
            setShowBuySellModal={setShowBuySellModal}
          />
        </Modal>
      </>
    );
  } else {
    return (
      <button onClick={() => setShowBuySellModal(true)}>
        Test Button Modal
      </button>
    );
  }
}
