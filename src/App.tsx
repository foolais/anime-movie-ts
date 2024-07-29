import { Wifi } from "lucide-react";
import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    setText("Foolaisx");
  }, []);

  return (
    <div className="text-green-600 font-bold tracking-widest">
      Hello World {text} <Wifi size={24} color="green" />
    </div>
  );
}

export default App;
