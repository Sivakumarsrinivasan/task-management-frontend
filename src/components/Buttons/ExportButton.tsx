import { Download, Upload } from "lucide-react";
import { useRef } from "react";
type file = {
    handleFile:(event:any) => void;
    exportCsv:() =>void;
    sampleCsv:()=>void
}
const ImportButtonExportButton = ({handleFile,exportCsv, sampleCsv}:file) =>{

    const fileRef = useRef<HTMLInputElement>(null);
    const openFile = () =>{
fileRef?.current?.click();
    }
    return(
        <div className="flex lg:w-[50%] sm:w-[50%] items-center gap-3">

  <button
  id="import-csv-btn"
    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
   onClick={openFile}
  >
    <Upload size={18} />
    Import CSV
  </button>

  <button
  id="export-csv-btn"
    className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-50"
    onClick={exportCsv}
  >
    <Download size={18} />
    Export CSV
  </button>
  <button
  id="download-sample-btn"
    className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-50"
    onClick={sampleCsv}
  >
    <Download size={18} />
     Sample Csv
  </button>

  <input type="file" onChange={(e)=>{handleFile(e)}} hidden ref={fileRef}/>

</div>
    )
}
export default ImportButtonExportButton;