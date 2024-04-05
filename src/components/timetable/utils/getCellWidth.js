import { Dimensions } from 'react-native';
export default function getCellWidth({ ticksWidth, numOfCells, }) {
    const deviceWidth = Dimensions.get('window').width;
    const cell_width = (deviceWidth - ticksWidth) / numOfCells;
    return cell_width;
}
