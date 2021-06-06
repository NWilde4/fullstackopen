import React from 'react';

interface CourseName {
  courseName: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDescription {
  type: "special";
  requirements: ["nodejs", "jest"];
}

type CoursePart = 
  CourseNormalPart | 
  CourseProjectPart | 
  CourseSubmissionPart | 
  CourseSpecialPart;

const Header = ({ courseName }: CourseName) => {
  return <h1>{courseName}</h1>;
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br/>
          <i>{part.description}</i>
        </p>
      )
    case 'groupProject':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br/>
          project exercises {part.groupProjectCount}
        </p>
      )
    case 'submission':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br/>
          <i>{part.description}</i>
          <br/>
          submit to {part.exerciseSubmissionLink}
        </p>
      )
    case 'special':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br/>
          <i>{part.description}</i>
          <br/>
          required skills: {part.requirements.join(', ')}
        </p>
      )
  }
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part: CoursePart) => (
        <Part 
          key={part.name}
          part={part}
        />
      ))}
    </div>
   )
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
   )
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;