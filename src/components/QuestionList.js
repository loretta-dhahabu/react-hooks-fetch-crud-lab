import React from "react";
import QuestionItem from "./QuestionItem";
import { useEffect, useState } from "react";

function QuestionList ()
{
  // const [ dispalyQuiz, setDisplayQuiz ] = useState( "All" );
  const [ questions, setQuestions ] = useState( [] );
  useEffect( () =>
  {
    fetch( "http://localhost:4000/questions" )
      .then( ( response ) => response.json() )
      .then( ( data ) =>setQuestions( data ) );
  }, [] )
  
  // function selectedQuiz (selection)
  // {
  //   setDisplayQuiz( selection );
  // }
  // const questionsToDisplay = questions.filter( ( question ) =>
  // {
  //    if (selectedQuiz === "All") {
  //      return true;
  //    } else {
  //      return question.selection === selectedQuiz;
  //    }
  
  // })
 
  //delete questions

  function deleteQuestion ( deletedQuestion )
  {
    const updatedQuestions = questions.filter( ( question ) => question.id !== deletedQuestion.id );
    setQuestions(updatedQuestions)
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}</ul>
      {questions.map((question) => (
        <QuestionItem
          question={question}
          key={question.id}
          prompt={question.prompt}
          answers={question.answers}
          correctIndex={question.correctIndex}
          onDeleteQuestion = {deleteQuestion}
        />
      ))}
    </section>
  );
}

export default QuestionList;
