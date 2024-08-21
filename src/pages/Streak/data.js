export  const streakCodes = [
    {
      _id:'id3',
      username: "user3",
      username: "Charlie",
      title: "Introduction to Python",
      description: "Learn the basics of Python programming Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, ",
      streak: "print('Hello, world!')",
      createdAt:'24',
      views:2,
      likes: ["user2", "user6"],
      comments: [
        { userId: "user1", comment: "Python is such a versatile language!", timestamp: "2023-07-01" },
        { userId: "user7", comment: "Can you share some examples of loops?", timestamp: "2023-07-02" }
      ],
      shares: [
        { userId: "user4", timestamp: "2023-07-03" },
        { userId: "user5", timestamp: "2023-07-04" }
      ],
      tags: ["Python", "programming", "beginners"],
      status: "public",
      author: { name: "Charlie", username: "user3" },
      language: "Python",
      rating: 4.8
    },
    {
      _id:'id4',
      username: "user4",
      username: "David",
      title: "Secure Authentication with JWT",
      description: "Implement secure authentication using JSON Web Tokens (JWT)",
      streak: "const token = jwt.sign({ userId: '123' }, secretKey, { expiresIn: '1h' });",
      createdAt:'7',
      views:3,
      likes: ["user1", "user5", "user9"],
      comments: [
        { userId: "user2", comment: "This is exactly what I needed for my project!", timestamp: "2023-07-01" },
        { userId: "user3", comment: "Can you explain token validation?", timestamp: "2023-07-02" }
      ],
      shares: [
        { userId: "user7", timestamp: "2023-07-03" },
        { userId: "user8", timestamp: "2023-07-04" }
      ],
      tags: ["Authentication", "security", "JWT"],
      status: "public",
      author: { name: "David", username: "user4" },
      language: "JavaScript",
      rating: 4.5
    },
    {
      _id:'id5',
      username: "user5",
      username: "Eve",
      title: "Responsive Web Design",
      description: "Create responsive websites that adapt to different devices",
      streak: "@media (max-width: 768px) {\n  /* Styles for mobile devices */\n}",
      createdAt:'9',
      views:1,
      likes: ["user1", "user2", "user6", "user7"],
      comments: [
        { userId: "user4", comment: "Responsive design is a game-changer!", timestamp: "2023-07-01" },
        { userId: "user9", comment: "How can I handle images in responsive design?", timestamp: "2023-07-02" }
      ],
      shares: [
        { userId: "user3", timestamp: "2023-07-03" },
        { userId: "user8", timestamp: "2023-07-04" }
      ],
      tags: ["Web design", "responsive", "CSS"],
      status: "public",
      author: { name: "Eve", username: "user5" },
      language: "CSS",
      rating: 4.6
    },
    {
      _id:'id1',
      username: "user1",
      username: "Alice",
      title: "Working with React Hooks",
      description: "Learn how to use React hooks for state management Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, ",
      streak: "const [count, setCount] = useState(0);\n\nfunction increment() {\n  setCount(count + 1);\n}",
      createdAt:'39',
      views:9,
      likes: ["user4", "user6", "user9"],
      comments: [
        { userId: "user2", comment: "Thanks for the tutorial!", timestamp: "2023-07-01" },
        { userId: "user3", comment: "Can you explain useEffect as well?", timestamp: "2023-07-02" }
      ],
      shares: [
        { userId: "user7", timestamp: "2023-07-03" },
        { userId: "user8", timestamp: "2023-07-04" }
      ],
      tags: ["React", "hooks", "state management"],
      status: "public",
      author: { name: "Alice", username: "user1" },
      language: "JavaScript",
      rating: 4.7
    },
    {
      _id:'id2',
      username: "user2",
      username: "Bob",
      title: "Responsive CSS Grid Layout",
      description: "Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, Create responsive grid layouts using CSS Grid, ",
      streak: "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));",
      createdAt:'4',
      views:6,
      likes: ["user1", "user5"],
      comments: [
        { userId: "user4", comment: "This saved me so much time!", timestamp: "2023-07-01" },
        { userId: "user6", comment: "Can you share an example with nested grids?", timestamp: "2023-07-02" }
      ],
      shares: [
        { userId: "user3", timestamp: "2023-07-03" },
        { userId: "user9", timestamp: "2023-07-04" }
      ],
      tags: ["CSS", "grid layout", "responsive design"],
      status: "public",
      author: { name: "Bob", username: "user2" },
      language: "CSS",
      rating: 4.2
    },
    {
      _id:'id6',
      username: "user6",
      username: "Frank",
      title: "Handling Asynchronous Operations in JavaScript",
      description: "Learn how to handle asynchronous operations using Promises and async/await",
      streak: "fetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => consolde.log(data))\n  .catch(error => console.error(error));",
      createdAt:'1',
      views:0,
      likes: ["user2", "user4", "user7", "user8", "user9"],
      comments: [
        { userId: "user1", comment: "This helped me understand asynchronous programming better!", timestamp: "2023-07-01" },
        { userId: "user3", comment: "Can you explain error handling in Promises?", timestamp: "2023-07-02" }
      ],
      shares: [
        { userId: "user5", timestamp: "2023-07-03" },
        { userId: "user8", timestamp: "2023-07-04" }
      ],
      tags: ["JavaScript", "asynchronous", "Promises", "async/await"],
      status: "public",
      author: { name: "Frank", username: "user6" },
      language: "JavaScript",
      rating: 4.9
    },
    {
      _id:'id7',
      username: "user7",
      username: "Grace",
      title: "Database Management with MongoDB",
      description: "Learn how to manage databases using MongoDB",
      streak: "const user = await User.findOne({ username });",
      createdAt:'5',
      views:4,
      likes: ["user1", "user4", "user6"],
      comments: [
        { userId: "user2", comment: "MongoDB is my go-to database!", timestamp: "2023-07-01" },
        { userId: "user8", comment: "Can you explain aggregation pipelines?", timestamp: "2023-07-02" }
      ],
      shares: [
        { userId: "user3", timestamp: "2023-07-03" },
        { userId: "user9", timestamp: "2023-07-04" }
      ],
      tags: ["MongoDB", "database", "NoSQL"],
      status: "public",
      author: { name: "Grace", username: "user7" },
      language: "JavaScript",
      rating: 4.3
    },
    {
      _id:'id8',
      username: "user8",
      username: "Henry",
      title: "Building RESTful APIs with Express",
      description: "Create RESTful APIs using the Express framework",
      streak: "app.get('/api/streaks', (req ,  res) => {\n  // Get streaks from the database\n  res.json(streaks);\n});",
      createdAt:'3',
      views:5,
      likes: ["user3", "user5", "user9"],
      comments: [
        { userId: "user1", comment: "Express makes building APIs so much easier!", timestamp: "2023-07-01" },
        { userId: "user7", comment: "Can you share an example of handling POST requests?", timestamp: "2023-07-02" }
      ],
      shares: [
        { userId: "user2", timestamp: "2023-07-03" },
        { userId: "user4", timestamp: "2023-07-04" }
      ],
      tags: ["Express", "API", "Node.js"],
      status: "public",
      author: { name: "Henry", username: "user8" },
      language: "JavaScript",
      rating: 4.7
    },
    {
      _id:'id9',
      username: "user9",
      username: "Ivy",
      title: "Data Visualization with D3.js",
      description: "Create interactive data visualizations using D3.js",
      streak: "const svg = d3.select('svg');\n\nsvg.append('circle')\n  .attr('cx', 50)\n  .attr('cy', 50)\n  .attr('r', 20)\n  .attr('fill', 'blue');",
      createdAt:'2',
      views:8,
      likes: ["user2", "user6", "user7", "user8"],
      comments: [
        { userId: "user3", comment: "D3.js is amazing for visualizations!", timestamp: "2023-07-01" },
        { userId: "user5", comment: "Can you explain scales and axes?", timestamp: "2023-07-02" }
      ],
      shares: [
        { userId: "user1", timestamp: "2023-07-03" },
        { userId: "user4", timestamp: "2023-07-04" }
      ],
      tags: ["D3.js", "data visualization", "web development"],
      status: "public",
      author: { name: "Ivy", username: "user9" },
      language: "JavaScript",
      rating: 4.4
    }
  ];
  