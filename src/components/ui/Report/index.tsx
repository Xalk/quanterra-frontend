import React, {FC, ReactNode, useEffect, useState} from 'react';
import ReactPDF, {Page, Text, View, Document, StyleSheet, Image} from '@react-pdf/renderer';
import Font = ReactPDF.Font;
import {toPng} from 'html-to-image';
import {IShip} from "@/types/ship.interface";


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
        fontFamily: 'Oswald',
        marginBottom: 10,
    },
    text: {
        // margin: 5,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Oswald'
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
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    column: {
        display: "flex",
        flexDirection: "column",
    }
});


interface ReportProps {
    pieChartUrl?: string
    barChartUrl?: string
    ship?: IShip
}

// Create Document Component
const Report: FC<ReportProps> = ({
                                     pieChartUrl,
                                     barChartUrl,
                                     ship
                                 }) => {

    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>
                    Quanterra
                </Text>
                <Text style={styles.title}>Summary Report - Ship {ship?.id}</Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.text}>Ship name: {ship?.shipName}</Text>
                        <Text style={styles.text}>Type: {ship?.shipType}</Text>
                        <Text style={styles.text}>Build year: {ship?.buildYear}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>Total crew members: {ship?.crewMember.length}</Text>
                        <Text style={styles.text}>Total storage tanks: {ship?.storageTanks.length}</Text>
                    </View>
                </View>

                <Text style={styles.subtitle}>Total treated waste for the last 6 months</Text>
                {barChartUrl && <Image src={barChartUrl} style={styles.image}/>}
                <Text style={styles.subtitle}>Waste types</Text>
                {pieChartUrl && <Image src={pieChartUrl} style={styles.image}/>}

                <Text style={styles.pageNumber} render={({pageNumber, totalPages}) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed/>
            </Page>
        </Document>
    );
}


export default Report;
