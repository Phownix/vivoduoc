import { TIMETABLE_CONSTANTS } from './constants';
import getCellWidth from './getCellWidth';
const getConfigs = (configsProp) => {
    const configs = Object.assign(Object.assign({}, TIMETABLE_CONSTANTS), configsProp);
    const numOfHours = configs.numOfHours || configs.endHour - configs.startHour + 1;
    const cellWidth = configs.cellWidth ||
        getCellWidth({
            ticksWidth: configs.timeTicksWidth,
            numOfCells: configs.numOfDaysPerPage,
        });
    const cellHeight = configs.cellHeight || cellWidth;
    return Object.assign(Object.assign({}, configs), { numOfHours,
        cellHeight,
        cellWidth });
};
export default getConfigs;
