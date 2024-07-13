import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RepPDF = (users, userGeneratingReport) => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleString();

    // Configura el título del reporte y la información en la parte superior del PDF
    doc.setFontSize(16);
    doc.text('Reporte de Usuarios', 14, 20);
    doc.setFontSize(12);
    doc.text(`Fecha de impresión: ${currentDate}`, 14, 30);
    doc.text(`Generado por: ${userGeneratingReport}`, 14, 40);

    const headers = [
        ['ID', 'Nombre de Usuario', 'Correo Electrónico', 'Roles', 'Fecha de Creación', 'Fecha de Actualización']
    ];

    const rows = users.map(user => [
        user._id,
        user.username,
        user.email,
        user.roles.map(role => role.name).join(', '),
        new Date(user.createdAt).toLocaleDateString(),
        new Date(user.updatedAt).toLocaleDateString()
    ]);

    // Agrega la tabla al PDF con el encabezado de la tabla en negro
    doc.autoTable({
        head: headers,
        body: rows,
        startY: 50, 
        theme: 'grid', 
        headStyles: {
            fillColor: [0, 0, 0], 
            textColor: [255, 255, 255], 
            fontSize: 10, 
            fontStyle: 'bold' 
        },
        styles: {
            fontSize: 9 
        },
    });

    // Guardamos el pdf
    doc.save('Reporte.pdf');
};

export default RepPDF;
