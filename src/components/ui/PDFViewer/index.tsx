import React, {ReactNode} from 'react';
import Report from "@/components/ui/Report";
import {PDFViewer} from '@react-pdf/renderer';

interface PDFViewerProps {
    children?: any
}


const BasicPDFViewer: React.FC<PDFViewerProps> = ({children}) => {
    return (
        <PDFViewer width='100%' height='100%'>
            {children}
        </PDFViewer>
    );
};

export default BasicPDFViewer;
