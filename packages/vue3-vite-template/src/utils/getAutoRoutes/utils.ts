export const getKeyPathStartPos = (keyPath: string[]) => {
  if (!keyPath || !keyPath.length) return 0;
  const dirName = keyPath.includes("pages") ? "pages" : "views";
  return keyPath.indexOf(dirName);
};
