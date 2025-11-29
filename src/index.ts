import { postImage } from './clients/at';
import { getNextImage } from './images'; 
import * as dotenv from 'dotenv';
dotenv.config();
function getDateFromFilename(filename: string): Date {
    const filenameNoJPG = filename.replace(/\.JPG$/i, "");
    return new Date(filenameNoJPG + 'T12:00:00'); 
}
function formatFullDate(dateObj: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}
function altTextFromFilename(filename: string): string {
    const dateObj = getDateFromFilename(filename);
    const formattedDate = formatFullDate(dateObj);
    return 'The Peanuts comic strip, drawn by Charles M. Schulz, originally released ' + formattedDate;
}
function postCaption(dateObj: Date): string {
  const formattedDate = formatFullDate(dateObj);
  if (dateObj.getDay() === 0) {
    return 'Sunday Peanuts by Schulz: ' + formattedDate; 
  } else {
    return 'Peanuts by Schulz: ' + formattedDate; 
  }
}
async function main() {
  const nextImage = await getNextImage(); 
  console.log(nextImage.imageName);
  const imageDate = getDateFromFilename(nextImage.imageName); 
  await postImage({
    path: nextImage.absolutePath,
    text: postCaption(imageDate),
    altText: altTextFromFilename(nextImage.imageName),
  });
}
main();