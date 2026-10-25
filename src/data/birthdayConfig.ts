// ✏️ EDIT EVERYTHING HERE. No other file needs personal details.
const friendName = '[FRIEND_NAME]'
const yourName = '[YOUR_NAME]'
export const config = {
  friendName, yourName,
  birthdayMessage: 'Today is all about celebrating YOU!',
  wishText: 'May every wish you make this year come true. 💝',
  // Put image files in public/images/ and list the file names here.
  photos: [
    { file: 'photo1.jpg', caption: 'Caption one' }, { file: 'photo2.jpg', caption: 'Caption two' },
    { file: 'photo3.jpg', caption: 'Caption three' }, { file: 'photo4.jpg', caption: 'Caption four' },
    { file: 'photo5.jpg', caption: 'Caption five' }, { file: 'photo6.jpg', caption: 'Caption six' },
  ],
  // Put your song in public/audio/ and set the file name (no copyrighted music is included).
  musicFile: 'audio/music.mp3',
  themeColors: { pink: '#ff6fb5', purple: '#a66bff', cyan: '#4de1ff', gold: '#ffd166' },
  birthdayLetter: `Dear ${friendName},

Happy Birthday! 🎂💖

Today is a special day because the world became a little more wonderful with you in it.

Thank you for the smiles, the laughter, the memories, and all the little moments that make our friendship special.

I hope this new year of your life brings you endless happiness, exciting adventures, beautiful surprises, and everything your heart wishes for.

Never stop smiling, dreaming, and being the amazing person you are.

No matter how busy life gets, I hope you always remember how special you are and how much you are appreciated.

May your birthday be filled with love, laughter, cake, and unforgettable moments.

Happy Birthday once again! 🎉

With lots of love,
${yourName} 💖`,
}
