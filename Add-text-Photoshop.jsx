var widthPlenki;
widthPlenki = 4.9;

var heighDop;
heighDop = 0.6;

var doc = app.activeDocument;

// вытаскиваем высоту и ширину фотографии в пикселях
var heightPX1 = doc.height.as('px');
var widthPX1 = doc.width.as('px');

// вытаскиваем имя файла и убираем из него формат, т.е. последние 4 символа имени
var docNameFormat = doc.name;
var docName = docNameFormat.substring(0, docNameFormat.length - 4);

//alert ("высота картинки " + heightPX + " пикселей")
//alert ("ширина картинки " + widthPX + " пикселей")
//alert ("имя файла: " + docName);

// если фото горизонтальное, то повернуть на 90 градусов по часовой
if (heightPX1 < widthPX1)
{
	activeDocument.rotateCanvas(90);
}

// новые параметры длины и ширины
var heightPX2 = activeDocument.height.as('px');
var widthPX2 = activeDocument.width.as('px');

var height2 = activeDocument.height;
var width2 = activeDocument.width;

var koeff;
koeff = width2/widthPlenki;
//alert (koeff)

// задает белый цвет фона
app.foregroundColor.rgb.hexValue = "ffffff";

//// добавить 10% от высоты внизу
//activeDocument.resizeCanvas(activeDocument.width, (activeDocument.height+activeDocument.height/10), AnchorPosition.TOPCENTER);

// добавить 0,6 см. белой пустой области внизу к картинке
activeDocument.resizeCanvas(activeDocument.width, (activeDocument.height+koeff*heighDop), AnchorPosition.TOPCENTER);

// считаем сколько пустой области добавлено в пикселях
var heightPX3 = activeDocument.height.as('px');
var height3 = activeDocument.height;
var deltaH = heightPX3 - heightPX2;
var deltaHsm = height3 - height2;

//alert ("была высота: " + heightPX2 + " стала высота: " + heightPX3 + " разница: " + deltaH);

// добавляем слой с текстом имени файла
var myLayer = activeDocument.artLayers.add();
myLayer.kind = LayerKind.TEXT;
myLayer.opacity = 100;
myLayer.name = docName;

//alert (deltaHsm)
var textProperty = myLayer.textItem;
textProperty.kind = TextType.POINTTEXT;
textProperty.size = koeff/2.5;   
textProperty.font = "ArialMT"; 
textProperty.color.rgb.hexValue = "000000";
textProperty.justification = Justification.CENTER;
textProperty.position = new Array(width2/2 , height3-deltaHsm/4);
textProperty.contents = docName;
 
// объединить слои
app.activeDocument.mergeVisibleLayers();

// Повернуть против часовой на 90 градусов
activeDocument.rotateCanvas(-90);