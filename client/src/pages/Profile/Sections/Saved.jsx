import Code from '../../Codes/Code';

const Saved = () => {
  const savedCodes = [
    { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: `console.log("Hello, world!");\n`, likes: [], shares: [], comments: [] },
    { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
    { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
    { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
    { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
    { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
    { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
    { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
    { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
    { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
    { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
  ]

  return (

    <div className="w-full flex flex-col gap-[2rem] ">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold mb-6 text-dark-slate-blue">Saved Codes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCodes.map((code, index) => (
            <Code code={code} key={index} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Saved;