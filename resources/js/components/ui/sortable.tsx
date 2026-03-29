import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { ReactNode } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';

interface SortableItem {
    id: number;
    order: number;
}

interface SortableRowProps {
    id: number;
    children: ReactNode;
}

export function SortableRow({ id, children }: SortableRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <TableRow ref={setNodeRef} style={style} className={isDragging ? 'bg-muted' : ''}>
            <TableCell className="w-12">
                <button
                    type="button"
                    className="cursor-grab active:cursor-grabbing touch-none"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                </button>
            </TableCell>
            {children}
        </TableRow>
    );
}

interface SortableListProps<T extends SortableItem> {
    items: T[];
    onReorder: (items: T[]) => void;
    children: (item: T, index: number) => ReactNode;
}

export function SortableList<T extends SortableItem>({
    items,
    onReorder,
    children,
}: SortableListProps<T>) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            
            const newItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
                ...item,
                order: index + 1,
            }));
            
            onReorder(newItems);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                {items.map((item, index) => children(item, index))}
            </SortableContext>
        </DndContext>
    );
}

export { arrayMove };
