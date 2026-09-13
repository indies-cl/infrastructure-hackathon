import { AsciiField } from './v2/AsciiField'
import { STAGE } from './v2/AsciiStage'

export default function Flag() {
  return (
    <div className="min-h-svh bg-[#181818]">
      <AsciiField
        src={STAGE.src}
        poster={STAGE.poster}
        preload="auto"
        className="h-svh"
      />
    </div>
  )
}
