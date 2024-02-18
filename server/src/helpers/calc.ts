// calculateAverage: Calculates the average of an array of numbers.
export function calculateAverage(numbers: number[]): number {
  const sum = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const average = sum / numbers.length;
  return average;
}

// calculateAge: Calculates the age based on a given birthdate.
export function calculateAge(birthdate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  const todaydate = today.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && todaydate < birthdate.getDate())) {
    age--;
  }

  return age;
}
