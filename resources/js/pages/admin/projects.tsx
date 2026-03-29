import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Edit, Plus, Save, Trash2, GripVertical, Upload, X, Image, FileText } from 'lucide-react';
import { FormEventHandler, useState, useRef, useEffect } from 'react';
import { Project, Amenity, FloorPlan } from '@/types/cms';
import { toast } from 'sonner';
import { IconPicker, LucideIcon } from '@/components/ui/icon-picker';
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

interface ProjectsProps {
    projects: Project[];
    section: {
        section_title?: string;
        section_description?: string;
    };
    categories: string[];
}

const projectCategories = [
    'Residential',
    'Commercial',
    'Restaurant',
    'Hotel & Resort',
    'Duplex',
    'Architecture',
    'Construction',
];
// Sortable Row Component
function SortableRow({ project, onEdit, onDelete, selected, onSelect }: {
    project: Project;
    onEdit: (p: Project) => void;
    onDelete: (id: number) => void;
    selected: boolean;
    onSelect: (id: number, checked: boolean) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: project.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <TableRow ref={setNodeRef} style={style} className={selected ? 'bg-primary/5' : ''}>
            <TableCell>
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={(e) => onSelect(project.id, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                />
            </TableCell>
            <TableCell>
                <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing touch-none">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                </button>
            </TableCell>
            <TableCell>
                <div className="w-16 h-16 rounded-lg overflow-hidden border">
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </TableCell>
            <TableCell className="font-medium">{project.title}</TableCell>
            <TableCell>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {project.category}
                </span>
            </TableCell>
            <TableCell className="text-muted-foreground">{project.location || '-'}</TableCell>
            <TableCell>{project.order}</TableCell>
            <TableCell>
                {project.is_featured && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        Featured
                    </span>
                )}
            </TableCell>
            <TableCell>
                <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${project.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                        }`}
                >
                    {project.is_active ? 'Active' : 'Inactive'}
                </span>
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(project)}
                    >
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(project.id)}
                    >
                        <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default function Projects({ projects, section, categories: initialCategories }: ProjectsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [sortableItems, setSortableItems] = useState<Project[]>(projects);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

    // Categories state
    const [projectCategories, setProjectCategories] = useState<string[]>(initialCategories);
    const [newCategory, setNewCategory] = useState('');
    const [savingCategories, setSavingCategories] = useState(false);

    const saveCategories = (cats: string[]) => {
        setSavingCategories(true);
        router.post('/admin/projects/categories', { categories: cats }, {
            preserveScroll: true,
            onSuccess: () => { toast.success('Categories updated.'); setSavingCategories(false); },
            onError: () => { toast.error('Failed to update categories.'); setSavingCategories(false); },
        });
    };

    const addCategory = () => {
        const trimmed = newCategory.trim();
        if (!trimmed || projectCategories.includes(trimmed)) return;
        const updated = [...projectCategories, trimmed];
        setProjectCategories(updated);
        setNewCategory('');
        saveCategories(updated);
    };

    const removeCategory = (cat: string) => {
        const updated = projectCategories.filter((c) => c !== cat);
        setProjectCategories(updated);
        saveCategories(updated);
    };
    const imageInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const pdfInputRef = useRef<HTMLInputElement>(null);

    const allSelected = sortableItems.length > 0 && selectedIds.size === sortableItems.length;
    const someSelected = selectedIds.size > 0 && !allSelected;

    const toggleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? new Set(sortableItems.map((p) => p.id)) : new Set());
    };

    const toggleSelect = (id: number, checked: boolean) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            checked ? next.add(id) : next.delete(id);
            return next;
        });
    };

    const handleBulkDelete = () => {
        router.post('/admin/projects/bulk-delete', { ids: Array.from(selectedIds) }, {
            onSuccess: () => {
                toast.success(`${selectedIds.size} project(s) deleted.`);
                setSelectedIds(new Set());
                setBulkDeleteConfirm(false);
            },
            onError: () => toast.error('Failed to delete selected projects.'),
        });
    };

    // Update sortable items when projects prop changes
    useEffect(() => {
        setSortableItems(projects);
    }, [projects]);

    // dnd-kit sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setSortableItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Send reorder request to server
                const reorderData = newItems.map((item, index) => ({
                    id: item.id,
                    order: index + 1,
                }));

                fetch('/admin/projects/reorder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    },
                    body: JSON.stringify({ items: reorderData }),
                }).then(() => {
                    toast.success('Projects reordered successfully!');
                }).catch(() => {
                    toast.error('Failed to reorder projects');
                });

                return newItems;
            });
        }
    };

    // Local state for complex nested data
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
    const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
    const [newPdfFiles, setNewPdfFiles] = useState<{ id: string; file: File; title: string }[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const sectionForm = useForm({
        section_title: section?.section_title || 'Featured Projects',
        section_description: section?.section_description || 'EXPLORE OUR RECENT WORK',
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        category: '',
        location: '',
        description: '',
        image: null as File | null,
        image_url: '',
        gallery: '[]',
        amenities: '[]',
        floor_plans: '[]',
        gallery_files: [] as File[],
        pdf_files: [] as File[],
        order: 0,
        is_featured: false,
        is_active: true,
    });

    const openDialog = (project?: Project) => {
        if (project) {
            setEditingProject(project);
            setGalleryImages((project.gallery || []).map(url => url));
            setAmenities((project.amenities || []).map((item) => ({
                id: (item as any).id ?? crypto.randomUUID(),
                name: (item as any).name ?? '',
                icon: (item as any).icon ?? 'Star',
            })));
            setFloorPlans(project.floor_plans || []);
            setNewGalleryFiles([]);
            setNewPdfFiles([]);
            setImageFile(null);
            setData({
                title: project.title,
                category: project.category,
                location: project.location || '',
                description: project.description || '',
                image: null,
                image_url: project.image_url,
                gallery: JSON.stringify(project.gallery || []),
                amenities: JSON.stringify(project.amenities || []),
                floor_plans: JSON.stringify(project.floor_plans || []),
                gallery_files: [],
                pdf_files: [],
                order: project.order,
                is_featured: project.is_featured,
                is_active: project.is_active,
            });
        } else {
            setEditingProject(null);
            setGalleryImages([]);
            setAmenities([]);
            setFloorPlans([]);
            setNewGalleryFiles([]);
            setNewPdfFiles([]);
            setImageFile(null);
            // Set order to the next available number
            const nextOrder = sortableItems.length > 0 
                ? Math.max(...sortableItems.map(p => p.order)) + 1 
                : 1;
            reset();
            setData('order', nextOrder);
        }
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setEditingProject(null);
        setGalleryImages([]);
        setAmenities([]);
        setFloorPlans([]);
        setNewGalleryFiles([]);
        setNewPdfFiles([]);
        setImageFile(null);
        reset();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Manually construct FormData for proper file handling
        const formData = new FormData();
        
        // Add basic fields
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('location', data.location || '');
        formData.append('description', data.description || '');
        formData.append('order', String(data.order));
        formData.append('is_featured', data.is_featured ? '1' : '0');
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('amenities', JSON.stringify(amenities));
        formData.append('floor_plans', JSON.stringify(floorPlans));
        formData.append('existing_gallery', JSON.stringify(galleryImages));

        // Add main image if exists
        if (imageFile) {
            formData.append('image', imageFile);
        }

        // Add new gallery files with [] notation for PHP file arrays
        newGalleryFiles.forEach((file) => {
            formData.append('gallery_files[]', file);
        });

        // Add new PDF files with [] notation
        newPdfFiles.forEach((item) => {
            formData.append('pdf_files[]', item.file);
            formData.append('pdf_titles[]', item.title);
        });

        if (editingProject) {
            formData.append('_method', 'PUT');
            router.post(`/admin/projects/${editingProject.id}`, formData, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Project updated successfully!');
                    closeDialog();
                },
                onError: (errors) => {
                    console.error('Update errors:', errors);
                    const errorMessages = Object.values(errors).flat().join(', ');
                    toast.error(`Failed to update project: ${errorMessages || 'Please check the form and try again.'}`);
                },
            });
        } else {
            router.post('/admin/projects', formData, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Project created successfully!');
                    closeDialog();
                },
                onError: (errors) => {
                    console.error('Create errors:', errors);
                    const errorMessages = Object.values(errors).flat().join(', ');
                    toast.error(`Failed to create project: ${errorMessages || 'Please check the form and try again.'}`);
                },
            });
        }
    };

    const deleteProject = (id: number) => {
        router.delete(`/admin/projects/${id}`, {
            onSuccess: () => {
                toast.success('Project deleted successfully!');
                setDeleteConfirmId(null);
            },
            onError: () => toast.error('Failed to delete project. Please try again.'),
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setData('image_url', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setData('image_url', '');
        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }
    };

    // Gallery handlers
    const handleGalleryAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setNewGalleryFiles(prev => [...prev, ...files]);
        if (galleryInputRef.current) {
            galleryInputRef.current.value = '';
        }
    };

    const removeGalleryImage = (index: number) => {
        setGalleryImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeNewGalleryFile = (index: number) => {
        setNewGalleryFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Amenity handlers
    const addAmenity = () => {
        setAmenities(prev => [...prev, { id: crypto.randomUUID(), name: '', icon: 'Star' }]);
    };

    const updateAmenity = (index: number, field: keyof Amenity, value: string) => {
        setAmenities(prev => prev.map((a, i) => i === index ? { ...a, [field]: value } : a));
    };

    const removeAmenity = (index: number) => {
        setAmenities(prev => prev.filter((_, i) => i !== index));
    };

    // Floor plan handlers
    const handlePdfAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewPdfFiles(prev => [...prev, { id: crypto.randomUUID(), file, title: file.name.replace('.pdf', '') }]);
            if (pdfInputRef.current) {
                pdfInputRef.current.value = '';
            }
        }
    };

    const updateNewPdfTitle = (index: number, title: string) => {
        setNewPdfFiles(prev => prev.map((item, i) => i === index ? { ...item, title } : item));
    };

    const removeFloorPlan = (index: number) => {
        setFloorPlans(prev => prev.filter((_, i) => i !== index));
    };

    const removeNewPdf = (index: number) => {
        setNewPdfFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Projects Section', href: '/admin/projects' }]}>
            <Head title="Projects Management" />

            <div className="p-4 max-w-7xl mx-auto w-full space-y-6">
                {/* Section Settings */}
                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Section Settings</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sectionForm.post('/admin/projects/section', {
                            onSuccess: () => toast.success('Section settings updated successfully!'),
                            onError: () => toast.error('Failed to update section. Please try again.'),
                        });
                    }} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="section_title">Section Title</Label>
                                <Input
                                    id="section_title"
                                    value={sectionForm.data.section_title}
                                    onChange={(e) => sectionForm.setData('section_title', e.target.value)}
                                    placeholder="Featured Projects"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="section_description">Section Description</Label>
                                <Textarea
                                    id="section_description"
                                    value={sectionForm.data.section_description}
                                    onChange={(e) => sectionForm.setData('section_description', e.target.value)}
                                    placeholder="EXPLORE OUR RECENT WORK"
                                    rows={2}
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={sectionForm.processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Section Settings
                        </Button>
                    </form>
                </div>

                {/* Categories Management */}
                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-1">Categories</h2>
                    <p className="text-sm text-muted-foreground mb-4">Add or remove project categories used in the filter and project form.</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {projectCategories.map((cat) => (
                            <span key={cat} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                {cat}
                                <button
                                    type="button"
                                    onClick={() => removeCategory(cat)}
                                    className="hover:text-destructive transition-colors ml-0.5"
                                    aria-label={`Remove ${cat}`}
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2 max-w-sm">
                        <Input
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New category name..."
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                        />
                        <Button type="button" onClick={addCategory} disabled={savingCategories || !newCategory.trim()}>
                            <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Projects Management</h1>
                        <p className="text-muted-foreground">Showcase your completed projects and portfolio.</p>
                    </div>
                    <Button onClick={() => openDialog()}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                    </Button>
                </div>

                {/* Bulk action bar */}
                {selectedIds.size > 0 && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-primary/10 border border-primary/20 rounded-xl">
                        <span className="text-sm font-medium">{selectedIds.size} project(s) selected</span>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setBulkDeleteConfirm(true)}
                        >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete Selected
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>
                            Clear Selection
                        </Button>
                    </div>
                )}

                <div className="bg-card rounded-xl border shadow-sm">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-10">
                                        <input
                                            type="checkbox"
                                            checked={allSelected}
                                            ref={(el) => { if (el) el.indeterminate = someSelected; }}
                                            onChange={(e) => toggleSelectAll(e.target.checked)}
                                            className="w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer"
                                        />
                                    </TableHead>
                                    <TableHead className="w-12"></TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Featured</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortableItems.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                                            No projects found. Add your first project to get started.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <SortableContext
                                        items={sortableItems.map(p => p.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {sortableItems.map((project) => (
                                            <SortableRow
                                                key={project.id}
                                                project={project}
                                                onEdit={openDialog}
                                                onDelete={setDeleteConfirmId}
                                                selected={selectedIds.has(project.id)}
                                                onSelect={toggleSelect}
                                            />
                                        ))}
                                    </SortableContext>
                                )}
                            </TableBody>
                        </Table>
                    </DndContext>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingProject ? 'Edit Project' : 'Add Project'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingProject
                                ? 'Update the details of this project.'
                                : 'Add a new project to your portfolio.'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submit}>
                        <Tabs defaultValue="basic" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 bg-secondary! border rounded-lg">
                                <TabsTrigger value="basic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md">Basic Info</TabsTrigger>
                                <TabsTrigger value="gallery" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md">Gallery</TabsTrigger>
                                <TabsTrigger value="amenities" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md">Amenities</TabsTrigger>
                                <TabsTrigger value="floorplans" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md">Floor Plans</TabsTrigger>
                            </TabsList>

                            <TabsContent value="basic" className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Modern Villa Design"
                                        />
                                        {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            value={data.category}
                                            onValueChange={(value) => setData('category', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {projectCategories.map((cat) => (
                                                    <SelectItem key={cat} value={cat}>
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="New York, USA"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Project details..."
                                        rows={4}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Main Project Image</Label>
                                    {data.image_url && (
                                        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                            <img
                                                src={data.image_url}
                                                alt="Project preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={removeImage}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                    <Input
                                        ref={imageInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => imageInputRef.current?.click()}
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        {data.image_url ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="order">Order</Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="is_featured">Featured Project</Label>
                                            <Switch
                                                id="is_featured"
                                                checked={data.is_featured}
                                                onCheckedChange={(checked) => setData('is_featured', checked)}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="is_active">Active</Label>
                                            <Switch
                                                id="is_active"
                                                checked={data.is_active}
                                                onCheckedChange={(checked) => setData('is_active', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="gallery" className="space-y-4 mt-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Project Gallery</Label>
                                        <div>
                                            <Input
                                                ref={galleryInputRef}
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleGalleryAdd}
                                                className="hidden"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => galleryInputRef.current?.click()}
                                            >
                                                <Image className="w-4 h-4 mr-2" />
                                                Add Images
                                            </Button>
                                        </div>
                                    </div>

                                    {(galleryImages.length > 0 || newGalleryFiles.length > 0) ? (
                                        <div className="grid grid-cols-4 gap-4">
                                            {galleryImages.map((url, index) => (
                                                <div key={`existing-${index}`} className="relative group">
                                                    <img
                                                        src={url}
                                                        alt={`Gallery ${index + 1}`}
                                                        className="w-full h-24 object-cover rounded-lg border"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => removeGalleryImage(index)}
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            ))}
                                            {newGalleryFiles.map((file, index) => (
                                                <div key={`new-${index}`} className="relative group">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`New ${index + 1}`}
                                                        className="w-full h-24 object-cover rounded-lg border ring-2 ring-primary"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => removeNewGalleryFile(index)}
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </Button>
                                                    <span className="absolute bottom-1 left-1 text-xs bg-primary text-primary-foreground px-1 rounded">New</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                                            <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                            <p>No gallery images yet. Click "Add Images" to upload.</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="amenities" className="space-y-4 mt-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Project Amenities</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={addAmenity}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Amenity
                                        </Button>
                                    </div>

                                    {amenities.length > 0 ? (
                                        <div className="space-y-3">
                                            {amenities.map((amenity, index) => (
                                                <div key={amenity.id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                                                    <div className="flex-1">
                                                        <Input
                                                            value={amenity.name}
                                                            onChange={(e) => updateAmenity(index, 'name', e.target.value)}
                                                            placeholder="Amenity name (e.g., Swimming Pool)"
                                                        />
                                                    </div>
                                                    <div className="w-48">
                                                        <IconPicker
                                                            value={amenity.icon}
                                                            onChange={(icon) => updateAmenity(index, 'icon', icon)}
                                                            placeholder="Select icon"
                                                        />
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeAmenity(index)}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                                            <p>No amenities added yet. Click "Add Amenity" to get started.</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="floorplans" className="space-y-4 mt-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Floor Plans (PDF)</Label>
                                        <div>
                                            <Input
                                                ref={pdfInputRef}
                                                type="file"
                                                accept=".pdf"
                                                onChange={handlePdfAdd}
                                                className="hidden"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => pdfInputRef.current?.click()}
                                            >
                                                <FileText className="w-4 h-4 mr-2" />
                                                Add Floor Plan
                                            </Button>
                                        </div>
                                    </div>

                                    {(floorPlans.length > 0 || newPdfFiles.length > 0) ? (
                                        <div className="space-y-3">
                                            {floorPlans.map((plan, index) => (
                                                <div key={plan.id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                                                    <FileText className="w-8 h-8 text-red-500" />
                                                    <div className="flex-1">
                                                        <p className="font-medium">{plan.title}</p>
                                                        <p className="text-sm w-16 text-muted-foreground truncate">{plan.pdf_url}</p>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeFloorPlan(index)}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            ))}
                                            {newPdfFiles.map((item, index) => (
                                                <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30 ring-2 ring-primary">
                                                    <FileText className="w-8 h-8 text-red-500" />
                                                    <div className="flex-1">
                                                        <Input
                                                            value={item.title}
                                                            onChange={(e) => updateNewPdfTitle(index, e.target.value)}
                                                            placeholder="Floor plan title"
                                                            className="mb-1"
                                                        />
                                                        <p className="text-sm text-muted-foreground">{item.file.name}</p>
                                                    </div>
                                                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">New</span>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeNewPdf(index)}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                                            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                            <p>No floor plans yet. Click "Add Floor Plan" to upload PDFs.</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>

                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={closeDialog}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="w-4 h-4 mr-2" />
                                {editingProject ? 'Update' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={deleteConfirmId !== null} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this project? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteConfirmId && deleteProject(deleteConfirmId)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={bulkDeleteConfirm} onOpenChange={setBulkDeleteConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete {selectedIds.size} Project(s)</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete {selectedIds.size} selected project(s)? This action cannot be undone and will also remove all associated images and files.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleBulkDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete All Selected
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
