export function formatResponse(error, res) {
  if (res) {
    return { success: true, data: res };
  } else {
    return { success: false, data: error };
  }
}