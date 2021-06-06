// import React from 'react';

// interface CourseName {
//   courseName: string;
// }

// interface CoursePart {
//   name: string;
//   exerciseCount: number;
// }

// interface CoursePartProps {
//   courseParts: CoursePart[];
// }

// const Header = ({ courseName }: CourseName) => {
//   return <h1>{courseName}</h1>;
// };

// const Content = ({ courseParts }: CoursePartProps) => {
//   return (
//     <div>
//       {courseParts.map((course: CoursePart) => {
//         return (
//           <p key={course.name}>
//             {course.name} {course.exerciseCount}
//           </p>
//         )      
//       })}
//     </div>
//    )
// };

// const Total = ({ courseParts}: CoursePartProps) => {
//   return (
//     <p>
//       Number of exercises{" "}
//       {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
//     </p>
//    )
// };

// const App = () => {
//   const courseName = "Half Stack application development";
//   const courseParts = [
//     {
//       name: "Fundamentals",
//       exerciseCount: 10
//     },
//     {
//       name: "Using props to pass data",
//       exerciseCount: 7
//     },
//     {
//       name: "Deeper type usage",
//       exerciseCount: 14
//     }
//   ];

//   return (
//     <div>
//       <Header courseName={courseName} />
//       <Content courseParts={courseParts} />
//       <Total courseParts={courseParts} />
//     </div>
//   );
// };

// export default App;