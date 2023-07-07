# fsuarezm/ux-select2

## Installation

### Download using composer
Add repository url to your composer.json
```json
    "repositories": {
        "fsuarezm/ux-select2": {
            "type": "github",
            "url": "https://github.com/fsuarezm/ux-select2.git"
        }
    }
```

Require the bundle with composer:
```bash
$ composer require fsuarezm/ux-select2
```

### Enable the bundle

Enable the bundle in the kernel:

```php
// config/bundles.php
return [
    // ...
    FSM\Symfony\UX\Select2\Select2Bundle::class => ['all' => true],
];
```

### Enable stimulus controller

Add controler to assets/controllers.json

```
    "controllers": {
        // ...
        "@fsuarezm/ux-select2": {
            "ckeditor": {
                "enabled": true,
                "fetch": "eager",
                "autoimport": {
                    "@fsuarezm/ux-select2/src/select2-bootstrap4.css": true
                }
            }
        }
    },

```

### Assets build setting
Install dependency
```bash
$ yarn install --force
```

## Usage

```php
// ...
use FSM\Symfony\UX\Select2\Form\Select2Type;

class CustomFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            // ...      
            ->add('select', Select2Type::class, [
                'autocomplete_url' => 'app_query_select2',
                    'select2_options' => [
                        'theme' => 'bootstrap4',
                ],
            ])
            // ...
            ;
    }

    // ...
}


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CustomController extends AbstractController
{
    #[Route('/app/select2', name: 'app_query_select2', methods: ['POST'])]
    public function select2(Request $request): Response
    {
        // Get params for requestm data
        $query = $request->request->get('query');   // string to search
        $page = $request->request->get('page');     // page number
        
        // ...
    
        return $this->json([
            'results' => [
                ['id' => '1', 'text' => 'Option 1'],
                ['id' => '2', 'text' => 'Option 2'],
                ['id' => '3', 'text' => 'Option 3'],
                ['id' => '4', 'text' => 'Option 4'],
                ['id' => '5', 'text' => 'Option 5'],
            ],
            'has_next_page' => false,
        ]);
    }
}

```
