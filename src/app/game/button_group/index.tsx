import CreateBackup from './create_backup';
import DeleteGame from './delete_game';
import OpenFolder from './open_folder';

export default function ButtonGroup() {
    return (
        <div className="absolute right-10 top-5 space-x-3">
            <CreateBackup />
            <OpenFolder />
            <DeleteGame />
        </div>
    );
}
