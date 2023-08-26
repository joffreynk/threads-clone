import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommunityValidation } from '@/lib/validations/community';
import * as z from 'zod';
import { createCommunity } from '@/lib/actions/community.actions';

function CreateCommunity({ community }: {community?: any}) {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CommunityValidation),
    defaultValues: {
      image: community?.image || "",
      name: community?.name || "",
      username: community?.username || "",
      bio: community?.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof CommunityValidation>) {
    await createCommunity({
        id: community._id,
      name: values.name,
      username: values.username,
      image: values.image,
      bio: values.bio,
    });
    router.push("/");
  }
  return (
    <DialogContent>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Create Community</DialogTitle>
          <DialogDescription>
            create your community and share interest
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-4 py-2 pb-4">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default CreateCommunity