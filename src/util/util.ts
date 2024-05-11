const CLASS_SEPARATOR: string = ' ';

export function getClassNames(
  className: string,
  customClasses?: string[]
): string {
  return customClasses ? joinClassNames(className, customClasses) : className;
}

function joinClassNames(className: string, customClasses: string[]): string {
  return className + CLASS_SEPARATOR + customClasses.join(CLASS_SEPARATOR);
}
