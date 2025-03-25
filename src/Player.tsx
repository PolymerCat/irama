import { exists, BaseDirectory, readDir } from '@tauri-apps/plugin-fs';
import {Howl, Howler} from 'howler';
import { useState, useEffect } from "react";


function MusicPlayer(){
    const [songList, setSongList] = useState<string[]>([]);

    async function getSongList() {
        try{
            const files = await readDir("", { baseDir: BaseDirectory.Download });
             // Filter only .mp3 files
             const mp3Files = files
             .filter(file => file.name?.endsWith(".mp3"))
             .map(file => file.name || "");
             console.log("Files:", files);

         setSongList(mp3Files);
        }
        catch (error) {
            console.error("Error reading directory:", error);
        }
    }
    useEffect(() => {
        getSongList(); // Pass an empty string for the base directory
    }, []);

    return(
        <div>
            <h2>Music Lists</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
        {songList.map((song, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
                <button style={{ width: "50%", textAlign: "left", padding: "8px" }}>
                    {song}
                </button>
            </li>
        ))}
    </ul>
        </div>
    );
}

export default MusicPlayer;