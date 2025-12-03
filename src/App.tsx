
import Editor from './pages/Editor';
import { MediaProvider } from './context/MediaContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TimelineProvider } from './context/TimelineContext';
import { PlaybackProvider } from './context/PlaybackContext';
import { SubtitlesProvider } from './context/SubtitlesContext';
import { SelectionProvider } from './context/SelectionContext';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <MediaProvider>
        <TimelineProvider>
          <PlaybackProvider>
            <SubtitlesProvider>
              <SelectionProvider>
                <Editor />
              </SelectionProvider>
            </SubtitlesProvider>
          </PlaybackProvider>
        </TimelineProvider>
      </MediaProvider>
    </DndProvider>
  );
}

export default App;
