import "./App.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import UserForm from "./components/UserForm";
import ReviewForm from "./components/ReviewFrom";
import ThanksForm from "./components/ThanksForm";
import Steps from "./components/Steps";

//Hooks
import { useForm } from "./Hooks/useForm";
import { useState } from "react";

function App() {
  const formTemplate = {
    name: "",
    email: "",
    review: "",
    comment: "",
  };

  const updateFieldHandle = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const [data, setData] = useState(formTemplate);

  const formComponents = [
    <UserForm data={data} updateFieldHandle={updateFieldHandle} />,
    <ReviewForm data={data} updateFieldHandle={updateFieldHandle} />,
    <ThanksForm data={data} />,
  ];

  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } =
    useForm(formComponents);

  return (
    <div className="app">
      <div className="header">
        <h2>Deixe sua avaliação</h2>
        <p>
          Ficamos feli;zes com a sua compra, utilize o formulário abaxo para
          avaliar o produto
        </p>
      </div>
      <div className="form-container">
        <p>
          <Steps currentStep={currentStep} />
        </p>
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className="inputs-container">{currentComponent}</div>
          <div className="actions">
            {!isFirstStep && (
              <button type="button" onClick={() => changeStep(currentStep - 1)}>
                <GrFormPrevious />
                <span>Voltar</span>
              </button>
            )}
            {!isLastStep ? (
              <button type="submit">
                <span>Avançar</span>
                <GrFormNext />
              </button>
            ) : (
              <button type="button">
                <span>Enviar</span>
                <FiSend />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
