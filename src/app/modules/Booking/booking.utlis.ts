export function convertTimeTo12HourFormat(hour24: string): string {
  const [hourStr, minuteStr] = hour24.split(':');

  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const suffix = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12;
  hour = hour === 0 ? 12 : hour;

  return `${hour.toString().padStart(2, '0')}:${minuteStr.padStart(
    2,
    '0',
  )} ${suffix}`;
}

export function format24Hour(timeString: string) {
  const cleanedTimeString = timeString.replace(/\s+/g, '');

  const timePart = cleanedTimeString.slice(0, -2);
  const period = cleanedTimeString.slice(-2);

  const [hour, minute] = timePart.split(':').map(Number);
  let formattedHour = hour;

  if (period === 'AM' && formattedHour === 12) {
    formattedHour = 0;
  } else if (period === 'PM' && formattedHour !== 12) {
    formattedHour += 12;
  }

  return `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

export function parseTimeTo24HourFormat(timeString: string): number {
  const [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return hours + minutes / 60;
}

export const calculateDurationAndPayableAount = (
  startTime: string,
  endTime: string,
  pricePerHour: number,
): number => {
  const startHours = parseTimeTo24HourFormat(startTime);
  const endHours = parseTimeTo24HourFormat(endTime);

  console.log(startHours);
  console.log(endHours);

  const durationInHours = endHours - startHours;

  return durationInHours * pricePerHour;
};
