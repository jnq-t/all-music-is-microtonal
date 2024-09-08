 /**
   * @method roundFreq shortens float for DOM display - purely UI/UX
   * @param {Object} float key.frequency float
   * @param {Int} places = which decimal point to round to
   */
export default function roundFreq(float, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(float * multiplier) / multiplier;
}