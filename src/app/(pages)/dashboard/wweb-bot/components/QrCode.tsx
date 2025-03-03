import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrCode({ data }: { data: string }) {
    return (
        <QRCodeCanvas value={data} size={256} level="H" />
    );
}