import { type Meta, type StoryObj } from "@storybook/react-vite";
import { Spinner } from "./spinner"

const meta: Meta<typeof Spinner> = {
    component: Spinner,
}

export default meta;

type Story = StoryObj<typeof Spinner>

export const Default: Story = {}

export const FullScreen: Story = {
    render: (args) => (
        <div className="flex h-screen w-screen items-center justify-center">
            <Spinner {...args} />
        </div>
    ),
    args: {
        size: 'xl'
    }
}