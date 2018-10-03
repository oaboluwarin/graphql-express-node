const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const { coursesData } = require('./course-list');

// GRAPHQL schema
const schema = buildSchema(`
  type Query {
    course(id: Int!): Course
    courses(topic: String): [Course]
  },

  type Mutation {
    updateCourseTopic(id: Int!, topic: String!): Course
  },

  type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
  }
`);

const getCourse = (args) => {
  const { id } = args;
  return coursesData.find(course => course.id === id);
}

const getCourses = (args) => {
  if(args.topic) {
    const { topic } = args
    return coursesData.filter(course => course.topic === topic);
  } else {
    return coursesData;
  }
}

const updateCourseTopic = ({ id, topic }) => {
  coursesData.map(course => {
    if(course.id === id) {
      course.topic = topic;
      return course;
    }
  });
  return coursesData.find(course => course.id === id);
}

// Root resolver
const root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic
};

// Server and GraphQL endpoint
const app = express();
app.use('/graphql', express_graphql({
  schema,
  rootValue: root,
  graphiql: true
}));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Express GraphQL Server running on ${port}`))
