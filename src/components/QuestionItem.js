import React from "react";

function QuestionItem({ question, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteQuestion() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    } )
      .then( ( response ) => response.json() )
    .then(()=> onDeleteQuestion(question))
  }

   function handleAnswerChange(event) {
     const selectedQuestionId = event.target.value;

     fetch(`http://localhost:4000/questions/${id}`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         correctIndex: selectedQuestionId,
       }),
     })
       .then((r) => r.json())
       .then((question) => console.log(question));
   }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleAnswerChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
