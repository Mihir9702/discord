export function storage(name: string | undefined) {
  const id = localStorage.getItem("id");
  if (!id || id !== name) {
    localStorage.setItem("id", name!);
  }
}
