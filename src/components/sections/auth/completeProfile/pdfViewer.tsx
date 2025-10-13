import Spinner from "@/components/common/spinner";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
};

// Maximum width for the PDF viewer
export default function PdfViewer({ file }: { file: File | string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;
    if (entry) setContainerWidth(entry.contentRect.width);
  }, []);

  useResizeObserver(containerRef, {}, onResize);

  return (
    <div className="w-full" ref={setContainerRef}>
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        options={options}
        loading={
          <div className="bg-accent flex h-60 w-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Page pageNumber={1} width={containerWidth} />
      </Document>
    </div>
  );
}
