import React, {FC, ReactNode} from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Font = ReactPDF.Font;
import {Box} from "@mui/material";
import s from "@/components/screens/storage-tanks/storage-tank.module.scss";


// Create styles
Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald'
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});


interface ReportProps {
    children?: ReactNode
}

// Create Document Component
const Report: FC<ReportProps> = ({children}) => {



    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>
                    Quanterra
                </Text>
                <Text style={styles.title}>Report</Text>

                <Box className={s.tableBox}>
                 <View>
                     <table>
                         <tbody>
                         <tr>
                             <th>Storage tank ID</th>
                             <td>Storage tank ID</td>
                         </tr>
                         <tr>
                             <th>Unit</th>
                             <td>Unit</td>
                         </tr>
                         <tr>
                             <th>Capacity</th>
                             <td>Unit</td>
                         </tr>
                         <tr>
                             <th>Waste type</th>
                             <td>Unit</td>
                         </tr>
                         <tr>
                             <th>Description</th>
                             <td>Unit</td>
                         </tr>
                         </tbody>
                     </table>
                 </View>

                </Box>

                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
}



export default Report;
