import { useState } from 'react';
import { Plus, Edit, Trash2, Menu as MenuIcon, Link2, Users, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner@2.0.3';

interface Category {
  id: number;
  name: string;
  count: number;
}

interface MenuItem {
  id: number;
  label: string;
  url: string;
  order: number;
}

interface WhiteLabelCustomizationProps {
  categories: Category[];
  headerMenuItems: MenuItem[];
  footerMenuItems: MenuItem[];
  onUpdateCategories: (categories: Category[]) => void;
  onUpdateHeaderMenu: (items: MenuItem[]) => void;
  onUpdateFooterMenu: (items: MenuItem[]) => void;
  enableCommunityAccounts: boolean;
  enableSaveDeals: boolean;
  enableMessages: boolean;
  onToggleCommunityAccounts: (enabled: boolean) => void;
  onToggleSaveDeals: (enabled: boolean) => void;
  onToggleMessages: (enabled: boolean) => void;
}

export function WhiteLabelCustomization({
  categories,
  headerMenuItems,
  footerMenuItems,
  onUpdateCategories,
  onUpdateHeaderMenu,
  onUpdateFooterMenu,
  enableCommunityAccounts,
  enableSaveDeals,
  enableMessages,
  onToggleCommunityAccounts,
  onToggleSaveDeals,
  onToggleMessages,
}: WhiteLabelCustomizationProps) {
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [menuType, setMenuType] = useState<'header' | 'footer'>('header');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newMenuLabel, setNewMenuLabel] = useState('');
  const [newMenuUrl, setNewMenuUrl] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    if (editingCategory) {
      // Update existing category
      onUpdateCategories(
        categories.map(c => 
          c.id === editingCategory.id 
            ? { ...c, name: newCategoryName }
            : c
        )
      );
      setNewCategoryName('');
      setEditingCategory(null);
      setCategoryDialogOpen(false);
      toast.success('Category updated successfully!');
    } else {
      // Add new category
      const newCategory = {
        id: Math.max(...categories.map(c => c.id), 0) + 1,
        name: newCategoryName,
        count: 0,
      };

      onUpdateCategories([...categories, newCategory]);
      setNewCategoryName('');
      setCategoryDialogOpen(false);
      toast.success('Category added successfully!');
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setCategoryDialogOpen(true);
  };

  const handleDeleteCategory = (id: number) => {
    onUpdateCategories(categories.filter(c => c.id !== id));
    toast.success('Category deleted successfully!');
  };

  const handleAddMenuItem = () => {
    if (!newMenuLabel.trim() || !newMenuUrl.trim()) {
      toast.error('Please enter both label and URL');
      return;
    }

    const items = menuType === 'header' ? headerMenuItems : footerMenuItems;
    const newMenuItem = {
      id: Math.max(...items.map(i => i.id), 0) + 1,
      label: newMenuLabel,
      url: newMenuUrl,
      order: items.length + 1,
    };

    if (menuType === 'header') {
      onUpdateHeaderMenu([...headerMenuItems, newMenuItem]);
    } else {
      onUpdateFooterMenu([...footerMenuItems, newMenuItem]);
    }

    setNewMenuLabel('');
    setNewMenuUrl('');
    setMenuDialogOpen(false);
    toast.success('Menu item added successfully!');
  };

  const handleDeleteMenuItem = (id: number, type: 'header' | 'footer') => {
    if (type === 'header') {
      onUpdateHeaderMenu(headerMenuItems.filter(i => i.id !== id));
    } else {
      onUpdateFooterMenu(footerMenuItems.filter(i => i.id !== id));
    }
    toast.success('Menu item deleted successfully!');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Categories Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <CardTitle className="text-base sm:text-lg">Business Categories</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Manage categories for organizing businesses</CardDescription>
            </div>
            <Button onClick={() => setCategoryDialogOpen(true)} size="sm" className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium">{category.name}</p>
                  <p className="text-xs text-muted-foreground">{category.count} businesses</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditCategory(category)}
                    className="hover:bg-muted"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Header Menu Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <CardTitle className="text-base sm:text-lg">Header Navigation Menu</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Customize your platform's header navigation links</CardDescription>
            </div>
            <Button onClick={() => {
              setMenuType('header');
              setMenuDialogOpen(true);
            }} size="sm" className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {headerMenuItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <MenuIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{item.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.url}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteMenuItem(item.id, 'header')}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer Menu Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <CardTitle className="text-base sm:text-lg">Footer Navigation Menu</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Customize your platform's footer navigation links</CardDescription>
            </div>
            <Button onClick={() => {
              setMenuType('footer');
              setMenuDialogOpen(true);
            }} size="sm" className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {footerMenuItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Link2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{item.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.url}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteMenuItem(item.id, 'footer')}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Member Accounts */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base sm:text-lg">Community Member Accounts</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Enable features for community members on your platform</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start sm:items-center justify-between py-2 gap-4">
            <div className="flex-1">
              <Label className="text-sm sm:text-base">Enable Member Accounts</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Allow community members to create accounts and access member features
              </p>
            </div>
            <Switch
              checked={enableCommunityAccounts}
              onCheckedChange={onToggleCommunityAccounts}
              className="flex-shrink-0"
            />
          </div>

          {enableCommunityAccounts && (
            <>
              <div className="border-t pt-4 space-y-4">
                <div className="flex items-start sm:items-center justify-between py-2 gap-4">
                  <div className="flex-1">
                    <Label className="text-sm sm:text-base">Save Deals Feature</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Let members save their favorite deals for later
                    </p>
                  </div>
                  <Switch
                    checked={enableSaveDeals}
                    onCheckedChange={onToggleSaveDeals}
                    className="flex-shrink-0"
                  />
                </div>

                <div className="flex items-start sm:items-center justify-between py-2 gap-4">
                  <div className="flex-1">
                    <Label className="text-sm sm:text-base">Messaging Feature</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enable members to receive messages and notifications
                    </p>
                  </div>
                  <Switch
                    checked={enableMessages}
                    onCheckedChange={onToggleMessages}
                    className="flex-shrink-0"
                  />
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Member Features Active</h4>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-center gap-2">
                    <Users className="w-3 h-3 flex-shrink-0" />
                    <span>Member account creation enabled</span>
                  </li>
                  {enableSaveDeals && (
                    <li className="flex items-center gap-2">
                      <Users className="w-3 h-3 flex-shrink-0" />
                      <span>Members can save deals</span>
                    </li>
                  )}
                  {enableMessages && (
                    <li className="flex items-center gap-2">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      <span>Members can receive messages</span>
                    </li>
                  )}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Add Category Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={(open) => {
        setCategoryDialogOpen(open);
        if (!open) {
          setEditingCategory(null);
          setNewCategoryName('');
        }
      }}>
        <DialogContent className="sm:max-w-[425px]" aria-describedby="category-dialog-description">
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
            <DialogDescription id="category-dialog-description">
              {editingCategory ? 'Update the category name' : 'Create a new category for organizing businesses'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                placeholder="e.g., Restaurants, Retail, Services"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => {
              setCategoryDialogOpen(false);
              setEditingCategory(null);
              setNewCategoryName('');
            }} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleAddCategory} className="w-full sm:w-auto">
              {editingCategory ? 'Update Category' : 'Add Category'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Menu Item Dialog */}
      <Dialog open={menuDialogOpen} onOpenChange={setMenuDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" aria-describedby="menu-dialog-description">
          <DialogHeader>
            <DialogTitle>
              Add {menuType === 'header' ? 'Header' : 'Footer'} Menu Link
            </DialogTitle>
            <DialogDescription id="menu-dialog-description">
              Add a new navigation link to your platform's {menuType} menu
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="menu-label">Link Label</Label>
              <Input
                id="menu-label"
                placeholder="e.g., Home, About Us, Contact"
                value={newMenuLabel}
                onChange={(e) => setNewMenuLabel(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="menu-url">Link URL</Label>
              <Input
                id="menu-url"
                placeholder="e.g., /, /about, /contact"
                value={newMenuUrl}
                onChange={(e) => setNewMenuUrl(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setMenuDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleAddMenuItem} className="w-full sm:w-auto">
              Add Menu Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}