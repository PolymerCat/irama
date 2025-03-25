import { useState } from "react";
//import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { readTextFile, exists, BaseDirectory } from '@tauri-apps/plugin-fs';
import {Howl} from 'howler';
import MusicPlayer from "./Player";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  const song = "11_11 - TAEYEON";
  var sound = new Howl({
    src: ['public/11_11 - TAEYEON.mp3'],
    html5: true
  });

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name}));
    const contents = await exists('Code/irama/public/]Maria - HWASA.mp3', { baseDir: BaseDirectory.Desktop });
    console.log(contents);
    const type = await readTextFile('test.txt',{
      baseDir: BaseDirectory.Picture,
    });
    console.log(type);

    }
  // async function findFile() {
  //   await exists('test.txt', { baseDir: BaseDirectory.Picture });
  // }
  
  return (
    <main className="container">
      <h1>Welcome to Irama, Aqif!</h1>
      
      {/* <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      {/* <p>Click on the Tauri, Vite, and React logos to learn more.</p> */}

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
      
      <div className="play-button">
        <button onClick={()=>sound.play()}>Play</button>
      </div>
      <div className="pause-button">
        <button onClick={()=>sound.pause()}>Pause</button>
      </div>

      <MusicPlayer/>
    </main>
  );
}

export default App;
