const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const CodeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const GenAiCode = model.startChat({
  generationConfig: CodeGenerationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, \nwithout any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.\nalso you can use date-fns for date format and react-chartjs-2 chart, graph library\n\nReturn the response in JSON format with the following schema:\n{\n  "projectTitle": "",\n  "explanation": "",\n  "files": {\n    "/App.js": {\n      "code": ""\n    },\n    ...\n  },\n  "generatedFiles": []\n}\n\nHere’s the reformatted and improved version of your prompt:\n\nGenerate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.\n\nReturn the response in JSON format with the following schema:\n\njson\nCopy code\n{\n  "projectTitle": "",\n  "explanation": "",\n  "files": {\n    "/App.js": {\n      "code": ""\n    },\n    ...\n  },\n  "generatedFiles": []\n}\nEnsure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file\'s code should be included in the code field, following this example:\nfiles:{\n  "/App.js": {\n    "code": "import React from \'react\';\\nimport \'./styles.css\';\\nexport default function App() {\\n  return (\\n    <div className=\'p-4 bg-gray-100 text-center\'>\\n      <h1 className=\'text-2xl font-bold text-blue-500\'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className=\'mt-2 text-gray-700\'>This is a live code editor.</p>\\n    </div>\\n  );\\n}"\n  }\n}\n  Additionally, include an explanation of the project\'s structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.\n  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required\n  \n  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg\n  -Add Emoji icons whenever needed to give good user experinence\n  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\n- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\n- Use icons from lucide-react for logos.\n\n- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "projectTitle": "Admin Dashboard",\n  "explanation": "This React project creates a simple admin dashboard. It\'s structured with components for the sidebar, dashboard content (including a welcome section, a data display, and a simple chart), and a settings area. Tailwind CSS provides styling, while lucide-react offers icons. date-fns provides date formatting.",\n  "files": {\n    "/App.js": {\n      "code": "import React from \'react\';\\nimport Sidebar from \'./components/Sidebar/Sidebar\';\\nimport Dashboard from \'./components/Dashboard/Dashboard\';\\nimport Settings from \'./components/Settings/Settings\';\\nimport { useState } from \'react\';\\n\\nfunction App() {\\n  const [activeTab, setActiveTab] = useState(\'dashboard\');\\n\\n  return (\\n    <div className=\\"flex h-screen bg-gray-100\\">\\n      <Sidebar setActiveTab={setActiveTab} />\\n      <div className=\\"flex-1 overflow-y-auto p-5\\">\\n        {activeTab === \'dashboard\' && <Dashboard />}\\n        {activeTab === \'settings\' && <Settings />}\\n      </div>\\n    </div>\\n  );\\n}\\n\\nexport default App;"\n    },\n    "/components/Sidebar/Sidebar.js": {\n      "code": "import React from \'react\';\\nimport { Home, Settings, Users, ArrowRight } from \'lucide-react\';\\n\\nfunction Sidebar({ setActiveTab }) {\\n  return (\\n    <div className=\\"w-64 bg-white shadow-md p-4\\">\\n      <div className=\\"mb-8\\">\\n        <h1 className=\\"text-2xl font-bold text-gray-800 flex items-center\\"><Home className=\\"mr-2\\"/> Admin Panel</h1>\\n      </div>\\n      <ul>\\n        <li className=\\"mb-2\\">\\n          <button onClick={() => setActiveTab(\'dashboard\')} className=\\"flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded\\">\\n            <ArrowRight className=\\"mr-2\\" />Dashboard\\n          </button>\\n        </li>\\n        <li className=\\"mb-2\\">\\n          <button onClick={() => setActiveTab(\'settings\')} className=\\"flex items-center w-full text-gray-700 hover:bg-gray-100 p-2 rounded\\">\\n            <ArrowRight className=\\"mr-2\\" />Settings\\n          </button>\\n        </li>\\n      </ul>\\n    </div>\\n  );\\n}\\n\\nexport default Sidebar;"\n    },\n    "/components/Dashboard/Dashboard.js": {\n      "code": "import React from \'react\';\\nimport Welcome from \'./Welcome\';\\nimport DataDisplay from \'./DataDisplay\';\\nimport ChartSection from \'./ChartSection\';\\n\\nfunction Dashboard() {\\n  return (\\n    <div className=\\"space-y-6\\">\\n      <Welcome />\\n      <DataDisplay />\\n      <ChartSection />\\n    </div>\\n  );\\n}\\n\\nexport default Dashboard;"\n    },\n    "/components/Dashboard/Welcome.js": {\n      "code": "import React from \'react\';\\nimport { User } from \'lucide-react\';\\n\\nfunction Welcome() {\\n  return (\\n    <div className=\\"bg-white shadow-md rounded-lg p-6\\">\\n      <div className=\\"flex items-center\\">\\n        <User className=\\"mr-4 text-gray-500\\" size={40} />\\n        <div>\\n          <h2 className=\\"text-lg font-semibold text-gray-800\\">Welcome back! 👋</h2>\\n          <p className=\\"text-gray-500\\">Here\'s an overview of your dashboard.</p>\\n        </div>\\n      </div>\\n    </div>\\n  );\\n}\\n\\nexport default Welcome;"\n    },\n    "/components/Dashboard/DataDisplay.js": {\n      "code": "import React from \'react\';\\nimport { Clock, Users, Star } from \'lucide-react\';\\n\\nfunction DataDisplay() {\\n  return (\\n    <div className=\\"grid grid-cols-1 md:grid-cols-3 gap-4\\">\\n      <div className=\\"bg-white shadow-md rounded-lg p-4\\">\\n        <div className=\\"flex items-center mb-2\\">\\n          <Clock className=\\"mr-2 text-blue-500\\" />\\n          <h3 className=\\"text-md font-semibold text-gray-700\\">Uptime</h3>\\n        </div>\\n        <p className=\\"text-2xl font-bold text-gray-800\\">99.99%</p>\\n      </div>\\n      <div className=\\"bg-white shadow-md rounded-lg p-4\\">\\n        <div className=\\"flex items-center mb-2\\">\\n          <Users className=\\"mr-2 text-green-500\\" />\\n          <h3 className=\\"text-md font-semibold text-gray-700\\">Active Users</h3>\\n        </div>\\n        <p className=\\"text-2xl font-bold text-gray-800\\">2,456</p>\\n      </div>\\n      <div className=\\"bg-white shadow-md rounded-lg p-4\\">\\n        <div className=\\"flex items-center mb-2\\">\\n          <Star className=\\"mr-2 text-yellow-500\\" />\\n          <h3 className=\\"text-md font-semibold text-gray-700\\">Rating</h3>\\n        </div>\\n        <p className=\\"text-2xl font-bold text-gray-800\\">4.8/5</p>\\n      </div>\\n    </div>\\n  );\\n}\\n\\nexport default DataDisplay;"\n    },\n    "/components/Dashboard/ChartSection.js": {\n      "code": "import React from \'react\';\\nimport { Bar } from \'react-chartjs-2\';\\nimport { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from \'chart.js\';\\n\\nChartJS.register(\\n    CategoryScale,\\n    LinearScale,\\n    BarElement,\\n    Title,\\n    Tooltip,\\n    Legend\\n);\\n\\nfunction ChartSection() {\\n  const data = {\\n    labels: [\'Jan\', \'Feb\', \'Mar\', \'Apr\', \'May\', \'Jun\'],\\n    datasets: [\\n      {\\n        label: \'Sales\',\\n        data: [12, 19, 3, 5, 2, 3],\\n        backgroundColor: \'rgba(54, 162, 235, 0.8)\',\\n      },\\n    ],\\n  };\\n\\n  const options = {\\n    responsive: true,\\n    plugins: {\\n      legend: {\\n        position: \'top\',\\n      },\\n      title: {\\n        display: true,\\n        text: \'Monthly Sales Chart\',\\n      },\\n    },\\n  };\\n\\n  return (\\n    <div className=\\"bg-white shadow-md rounded-lg p-4\\">\\n      <Bar data={data} options={options} />\\n    </div>\\n  );\\n}\\n\\nexport default ChartSection;"\n    },\n    "/components/Settings/Settings.js": {\n      "code": "import React from \'react\';\\nimport { Mail, Bell, Calendar } from \'lucide-react\';\\n\\nfunction Settings() {\\n  return (\\n    <div className=\\"space-y-6\\">\\n      <div className=\\"bg-white shadow-md rounded-lg p-6\\">\\n        <h2 className=\\"text-lg font-semibold text-gray-800 mb-4\\">Account Settings</h2>\\n        <div className=\\"mb-4\\">\\n          <label className=\\"block text-gray-700 text-sm font-bold mb-2\\" htmlFor=\\"email\\">Email</label>\\n          <div className=\\"flex items-center\\">\\n            <Mail className=\\"mr-2 text-gray-500\\" />\\n            <input type=\\"email\\" id=\\"email\\" className=\\"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\\" placeholder=\\"email@example.com\\" />\\n          </div>\\n        </div>\\n      </div>\\n\\n      <div className=\\"bg-white shadow-md rounded-lg p-6\\">\\n        <h2 className=\\"text-lg font-semibold text-gray-800 mb-4\\">Notification Preferences</h2>\\n        <div className=\\"flex items-center mb-2\\">\\n          <Bell className=\\"mr-2 text-gray-500\\" />\\n          <label className=\\"inline-flex items-center\\">\\n            <input type=\\"checkbox\\" className=\\"form-checkbox h-5 w-5 text-blue-500\\" />\\n            <span className=\\"ml-2 text-gray-700\\">Receive email notifications</span>\\n          </label>\\n        </div>\\n      </div>\\n\\n      <div className=\\"bg-white shadow-md rounded-lg p-6\\">\\n        <h2 className=\\"text-lg font-semibold text-gray-800 mb-4\\">Calendar Integration</h2>\\n        <div className=\\"flex items-center\\">\\n          <Calendar className=\\"mr-2 text-gray-500\\" />\\n          <button className=\\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline\\">Connect to Calendar</button>\\n        </div>\\n      </div>\\n    </div>\\n  );\\n}\\n\\nexport default Settings;"\n    }\n  },\n  "generatedFiles": [\n    "/App.js",\n    "/components/Sidebar/Sidebar.js",\n    "/components/Dashboard/Dashboard.js",\n    "/components/Dashboard/Welcome.js",\n    "/components/Dashboard/DataDisplay.js",\n    "/components/Dashboard/ChartSection.js",\n    "/components/Settings/Settings.js"\n  ]\n}\n```',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());

// run();
